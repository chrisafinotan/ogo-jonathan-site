import tag from './tag'

export default ({hasDisplayOptions = true, ...props} = {}) => {
  const crops = [
    {title: 'Original', value: 0},
    {title: '1 : 1 (square)', value: 1},
    {title: '5 : 7', value: 0.7142857143},
    {title: '4 : 6', value: 0.6666666667},
    {title: '16 : 9', value: 1.7777777778, default: true},
  ]

  return {
    name: 'photo',
    type: 'image',
    title: 'Photo',
    validation: (Rule) => Rule.required(),
    options: {
      hotspot: true,
    },
    fields: [
      {
        title: 'Display Size (aspect ratio)',
        name: 'customRatio',
        type: 'number',
        options: {
          list: crops,
        },
        validation: (Rule) => {
          return Rule.custom((field, context) =>
            'asset' in context.parent && field === undefined ? 'Required!' : true
          )
        },
      },
      {
        name: 'name',
        type: 'string',
        title: 'Name',
      },
      {
        name: 'caption',
        type: 'string',
        title: 'Image Caption',
      },
      {
        name: 'alt',
        type: 'string',
        title: 'Alternative text',
        description: 'Important for SEO and accessiblity.',
      },
      {
        name: 'tags',
        type: 'array',
        title: 'Photo Tags',
        of: [tag()],
        options: {
          layout: 'grid',
        },
      },
      {
        name: 'lens',
        type: 'number',
        title: 'Lens (mm)',
      },
    ],
    preview: {
      select: {
        asset: 'asset',
        alt: 'asset.alt',
        customAlt: 'alt',
        customRatio: 'customRatio',
      },
      prepare({alt, customAlt, customRatio, asset}) {
        const crop =
          crops.find((crop) => crop.value === customRatio) || crops.find((crop) => crop.default)

        return {
          title: customAlt ?? alt ?? '(alt text missing)',
          subtitle: crop?.title,
          media: asset,
        }
      },
    },
  }
}
