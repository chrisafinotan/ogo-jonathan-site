import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {media} from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'ogo_jonathan_site',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',

  plugins: [deskTool(), media(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
