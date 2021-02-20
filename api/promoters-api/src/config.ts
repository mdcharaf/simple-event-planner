const configs = {
  'development': {
    'PORT': process.env.PORT,
    'URL': process.env.URL,
    'SECRET': process.env.SECRET,
    'username': "muhammad",
    'password': null,
    'database': "event-planner",
    'host': "localhost",
    'dialect': "postgres"
  }
};

const env: string = (process.env.NODE_ENV as string) || 'development';
export const config = (configs as any)[env];
