import { type MRT_ColumnDef } from 'material-react-table'

export const columns: MRT_ColumnDef<any>[] = [
  {
    accessorKey: 'id', //access nested data with dot notation
    header: 'ID',
    // enableColumnFilter: false,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'plates',
    header: 'Patentes',
  },
]

export const data = [
  {
    id: 'Mason',
    name: 'Anderson',
    plates: 'manderson57@yopmail.com',
  },
]
