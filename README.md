# Back_Inventory

## Proceso de Desarrollo 🚀
### 1. Creación de una rama 🐙
Cuando sea el momento de iniciar con su tarea(ticket), debe de crear una rama basada en la main, el nombre de la rama debe de seguir el patron.
```
<BRANCH_TYPE>/<PROJECT_KEY>-<TICKET_ID>
```
Tipos de ramas:

_**feature:** Se utiliza para desarrollar nuevas características para la próxima o una futura versión lejana._

_**bugfix:** Se utiliza cuando es necesario actuar inmediatamente ante un estado no deseado de una versión de producción en vivo o que afecte otras areas de desarrollo._

### 2. Registro de cambios 🐾
Necesitamos hacer un seguimiento de todos los cambios en los componentes, para ello necesitamos mantener actualizado el archivo ``` CHANGELOG.md ```, con la siguiente estrcutura.

```
## [X.Y.Z](PR_URL) (YYYY-MM-DD) -> Fecha y Pull Request del ultimo cambio
**Added/Fixed**
- [PROJ-ZZZ](TICKET_URL) <Descripción del cambio> ->  Y URL del ticket
```

**ejemplo:**

```
[0.1.0](https://github.com/TEAMVALLESOFT/Back_Inventory/pull-requests/1) (2021-03-14)
**Added**
- [IV-01] Adición del servicio de login. 
```

### 3. Certifique sus cambio 👨‍💻
Asegurarse de que los cambios funcionan como se espera es un proceso de dos pasos:

_**Pruebas locales:** Cada desarrollador debe probar en sus máquinas los cambios._

_**Pruebas de desarrollo y control de calidad:**_ Cuando el desarrollador está seguro de promover los cambios, debe crear un PR a la main, el PR debe ser aprobado por otros compañeros de equipo y finalmente ser fusionado usando ```--squash.```
