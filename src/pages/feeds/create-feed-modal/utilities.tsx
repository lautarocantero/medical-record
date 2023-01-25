export const getTypeOptions = () => [
  {
    label: 'Articulo',
    value: 'Article',
  },
  {
    label: 'Evento',
    value: 'Event',
  },
  {
    label: 'Seguridad',
    value: 'seguridad',
  },
];

export const getSelectedNeighbourhoods = (neighbourhoods: any, selectedGuids: any) =>
  neighbourhoods
    .filter((element: any) => selectedGuids.includes(element.guid))
    .map((n: any) => ({ label: n.name, value: n.guid }));

export const isEventForm = (values: any) => {
  if (values.type.value === 'Event') {
    return true;
  }
  return false;
};

export const isSeguridadForm = (values: any) => {
  if (values.type.value === 'seguridad') {
    return true;
  }
  return false;
};

export const getNeighbourhoodOptions = (neighbourhoods: any) =>
  neighbourhoods.map((n: any) => ({ label: n.name, value: n.guid }));
