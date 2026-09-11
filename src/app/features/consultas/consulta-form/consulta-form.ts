import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ConsultaService } from '../../../core/services/consulta.service';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  standalone: true,
  selector: 'app-consulta-form',
  styleUrl: './consulta-form.css',
  templateUrl: './consulta-form.html',
})
export class ConsultaForm implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly consultaService = inject(ConsultaService);
  private readonly snackBar = inject(MatSnackBar);

  consultaId?: number;

  loading = false;
  saving = false;

  form = this.fb.nonNullable.group({
    animal_id: [0, [Validators.required, Validators.min(1)]],

    data_consulta: ['', Validators.required],
    motivo: ['', [Validators.required, Validators.maxLength(500)]],
    observacoes: [''],
  });

  get editando(): boolean {
    return !!this.consultaId;
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.consultaId = id;
      this.carregarConsulta(id);
    }
  }

  carregarConsulta(id: number): void {
    this.loading = true;
    this.consultaService.buscarPorId(id).subscribe({
      next: (consulta) => {
        this.form.patchValue({
          animal_id: consulta.animal.id,
          data_consulta: consulta.data_consulta,
          motivo: consulta.motivo,
          observacoes: consulta.observacoes ?? '',
        });
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        this.snackBar.open('Erro ao carregar a consulta.', 'Fechar', {
          duration: 3000,
        });
        this.voltar();
      },
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving = true;

    const dados = this.form.getRawValue();

    const request = {
      animal_id: dados.animal_id,
      data_consulta: dados.data_consulta,
      motivo: dados.motivo,
      observacoes: dados.observacoes,
    };

    const operacao = this.consultaId
      ? this.consultaService.atualizar(this.consultaId, request)
      : this.consultaService.criar(request);

    operacao.subscribe({
      next: (consulta) => {
        this.saving = false;
        this.snackBar.open(
          this.editando ? 'Consulta atualizada com sucesso' : 'Consulta criada com sucesso.',
          'Fechar',
          {
            duration: 3000,
          }
        );

        this.router.navigate(['/consultas', consulta.id]);
      },

      error: (error) => {
        console.error(error);
        this.saving = false;
        this.snackBar.open('Erro ao salvar a consulta.', 'Fechar', {
          duration: 3000,
        });
      },
    });
  }

  voltar(): void {
    this.router.navigate(['/consultas']);
  }
}
