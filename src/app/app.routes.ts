import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'consultas',
        pathMatch: 'full'
    },
    {
        path: 'consultas',
        loadComponent: () =>
            import('./features/consultas/consulta-list/consulta-list')
                .then(m => m.ConsultaList)
    },
    {
        path: 'consultas/nova',
        loadComponent: () =>
            import('./features/consultas/consulta-form/consulta-form')
                .then(m => m.ConsultaForm)
    },
    {
        path: 'consultas/:id',
        loadComponent: () =>
            import('./features/consultas/consulta-detail/consulta-detail')
                .then(m => m.ConsultaDetail)

    },
    {
        path: 'consultas/:id/editar',
        loadComponent: () =>
            import('./features/consultas/consulta-form/consulta-form')
                .then(m => m.ConsultaForm)
    },
];
