import { Module } from '@nestjs/common';
import { PersistenceModule } from './infra/persistence.module'; // Ajuste o caminho conforme necessário

import { ApartmentModule } from './core/apartment/apartment.module';
import { AuthModule } from './core/auth/auth.module';
import { AuthModule2 } from './core/auth2/auth.module';
import { CondominiumModule } from './core/condominium/condominium.module';
import { MaintenanceModule } from './core/maintenance/maintenance.module';
import { ReservationModule } from './core/reservation/reservation.module';
import { SpaceReservationModule } from './core/space-reservation/space-reservation.module';
import { UserModule } from './core/user/user.module';
import { WarningsModule } from './core/warnings/warnings.module';

@Module({
  imports: [
    PersistenceModule,
    WarningsModule,
    ReservationModule,
    UserModule,
    CondominiumModule,
    MaintenanceModule,
    AuthModule,
    SpaceReservationModule,
    ApartmentModule,
    AuthModule2,
  ],
})
export class AppModule {}
