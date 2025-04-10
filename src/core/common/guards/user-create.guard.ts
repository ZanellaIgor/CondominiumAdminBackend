import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class UserCreateGuard implements CanActivate {
  private readonly logger = new Logger(UserCreateGuard.name);

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Usuário autenticado (já validado por outros guards)

    // 1. Se for MASTER, permite tudo
    if (user.role === Role.MASTER) {
      return true;
    }

    const { role: targetRole, condominiumIds: targetCondominiumIds = [] } =
      request.body;

    // 2. Bloqueia criação de MASTER por não-MASTER
    if (targetRole === Role.MASTER) {
      this.logger.warn(`Blocked MASTER creation attempt by user ${user.id}`);
      throw new ForbiddenException('Cannot create MASTER users');
    }

    // 3. Valida condomínios (apenas para ADMIN)
    if (user.role === Role.ADMIN) {
      this.validateAdminCondominiums(user.condominiumIds, targetCondominiumIds);
    }

    return true;
  }

  private validateAdminCondominiums(
    adminCondominiumIds: number[],
    targetCondominiumIds: unknown,
  ): void {
    const normalizedIds = this.normalizeCondominiumIds(targetCondominiumIds);

    // Se o ADMIN não tiver acesso a pelo menos um condomínio solicitado, bloqueia
    const hasAccess = normalizedIds.some((id) =>
      adminCondominiumIds.includes(id),
    );

    if (!hasAccess) {
      throw new ForbiddenException(
        'You cannot assign users to condominiums outside your scope',
      );
    }
  }

  private normalizeCondominiumIds(ids: unknown): number[] {
    if (Array.isArray(ids)) {
      return ids.filter((id): id is number => typeof id === 'number' && id > 0);
    }
    return typeof ids === 'number' && ids > 0 ? [ids] : [];
  }
}
