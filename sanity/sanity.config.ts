import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'bep-studio',
  title: 'BEP — Content Studio',
  projectId: '83dx0q7o',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
})
