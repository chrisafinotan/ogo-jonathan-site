import customImage from './custom_image'

export default {
  name: 'project',
  type: 'object',
  title: 'Project',
  subTitle: 'Example Sub Title',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Project Heading',
    },
    {
      name: 'description',
      type: 'string',
      title: 'Project Description',
    },
    {
      name: 'projectDate',
      type: 'date',
      title: 'Project Date',
    },
    {
      name: 'projectPhotos',
      type: 'array',
      title: 'Project Photo(s)',
      validation: (Rule) => Rule.required().custom((photos) => {
        if (typeof photos === 'undefined') {
          return false // don't allow undefined values
        }
      }),
      of: [customImage()],
      options: {
        layout: 'grid',
      },
    },
    {
      name: 'collaborations',
      type: 'string',
      title: 'Collaborations',
    },
    {
      name: 'isBranded',
      type: 'boolean',
      title: 'Branded Content',
    },
  ],
}
