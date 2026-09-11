import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Consulta } from '../../../core/models/consulta.model';
import { ConsultaService } from '../../../core/services/consulta.service';

@Component({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  standalone: true,
  selector: 'app-consulta-detail',
  styleUrl: './consulta-detail.css',
  templateUrl: './consulta-detail.html',
})
export class ConsultaDetail implements OnInit{
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly consultaService = inject(ConsultaService);
  private readonly snackBar = inject(MatSnackBar);

  consulta?: Consulta;

  loading = false;

  ngOnInit(): void {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if(!id) {
      this.voltar();
      return
    }
    this.carregarConsulta(id);

  }

  carregarConsulta(id: number): void {
    this.loading = true;
    this.consultaService.buscarPorId(id).subscribe({
      next: (consulta) => {
        this.consulta = consulta;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        this.snackBar.open(
          'consulta não encontrada.',
          'Fechar', 
          {
            duration: 3000
          }
        );
        this.voltar();
      }
    });
  }

  voltar() : void {
    this.router.navigate(['/consultas']);
  }

  editar() : void {
    if (!this.consulta) {
      return;
    }
    this.router.navigate([
      '/consultas',
      this.consulta.id,
      'editar'
    ]);
  }

  formatarData(data: string): string {
    return new Intl.DateTimeFormat('pt-BR').format(
      new Date(`${data}T00:00:00`)
    )
  }
}

