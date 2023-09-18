import { readFile } from 'fs/promises';
import { load } from 'js-yaml';
import { join } from 'path';
import { z } from 'zod';

const filePath = join(__dirname, '../../gandalf.config.yml');

const gandalfConfigSchema = z.object({
  integrations: z.object({
    google_oauth: z
      .object({
        client_id: z.string(),
        client_secret: z.string(),
      })
      .optional(),
  }),
});

export type GandalfConfigSchema = z.infer<typeof gandalfConfigSchema>;

export const parseEnvVars = (yml: string) => {
  //Find env using regex ${ENV_VAR}
  const envRegex = /\${(.*?)}/g;
  const envVars = yml.match(envRegex);

  envVars?.forEach((envVar) => {
    const envVarName = envVar.replace('${', '').replace('}', '');
    const envVarValue = process.env[envVarName];
    yml = yml.replaceAll(envVar, envVarValue || '');
  });

  return yml;
};

export const gandalfConfigFile = async () => {
  const ymlFile = await readFile(filePath, 'utf8');
  const ymlWithEnv = parseEnvVars(ymlFile);
  const ymlParsed = load(ymlWithEnv);

  const ymlValidated = gandalfConfigSchema.parse(ymlParsed);

  return ymlValidated;
};
