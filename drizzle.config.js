/** @type {import ("drizzle-kit").Config} */

export default{
  dialect: 'postgresql',
  schema: "./utils/schema.js",
  
  dbCredentials:{
    url: 'postgresql://neondb_owner:npg_homTEA0ebQ9x@ep-cool-butterfly-a8t8fu80-pooler.eastus2.azure.neon.tech/AI%20Interview?sslmode=require',
}
};
