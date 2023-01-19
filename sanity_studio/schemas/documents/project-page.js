export default {
  name: 'projectPage',
  type: 'document',
  title: 'Project Page',
  groups: [
    {title: 'Content', name: 'content', default: true},
    {title: 'Settings', name: 'settings'},
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'settings',
    },
    {
      title: 'URL Slug',
      name: 'slug',
      type: 'slug',
      description: '(required)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'settings',
    },
    {
      title: 'Page Content',
      name: 'modules',
      type: 'project',
      group: 'content',
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
    },
    prepare({title = 'Untitled', slug = {}}) {
      const path = `/${slug.current}`
      return {
        title,
        subtitle: slug.current ? path : '(missing slug)',
      }
    },
  },
}
