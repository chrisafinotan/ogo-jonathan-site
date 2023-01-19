export default () => {
  const photoTypes = [
    {title: 'Color', value: 'COL'},
    {title: 'Black and White', value: 'BW'},
    {title: 'Polaroid', value: 'POL'},
  ]

  return {
    name: 'type',
    type: 'string',
    title: 'Photo type',
    options: {
      list: photoTypes,
    },
  }
}
