import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Consulta } from '../../../core/models/consulta.model';
import { ConsultaService } from '../../../core/services/consulta.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  selector: 'app-consulta-list',
  styleUrl: './consulta-list.css',
  templateUrl: './consulta-list.html',
})
export class ConsultaList implements OnInit{

  private readonly consultaService = inject(ConsultaService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  consultas: Consulta[] = [];

  displayedColumns = [
    'animal',
    'data',
    'acoes',
  ]

  loading =false;

  ngOnInit(): void {
    this.carregarConsultas();
  }

  carregarConsultas(): void {
    this.loading = true;

    this.consultaService.listar().subscribe({
      next: (consultas) => {
        this.consultas = consultas;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        this.snackBar.open(
          'Erro ao carregar as consultas.',
          'Fechar',
          {
            duration: 3000
          }
        );
      }
    });
  }

  novaConsulta(): void {
    this.router.navigate(['/consultas/nova']);
  }

  visualizar(id:number): void{
    this.router.navigate(['/consultas',id]);
  }

  editar(id:number): void {
    this.router.navigate(['consultas', id, 'editar']);
  }

  excluir(consulta: Consulta): void {
    const confirmou = window.confirm(`Deseja realmente excluir a consulta do animal ${consulta.animal.nome}?`);
    
    if (!confirmou) {
      return;
    }

    this.consultaService.excluir(consulta.id).subscribe({
      next: () => {
        this.snackBar.open(
          'Consulta excluida com sucesso.',
          'Fechar',
          {
            duration: 3000
          }
        );
      }
    });
  }

  formatarData(data: string): string {
    return new Intl.DateTimeFormat('pt-BR').format(
      new Date(`${data}T00:00:00`)
    );
  }

}
