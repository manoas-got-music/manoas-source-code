import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const createJamSessionSchema = Yup.object({
  name: Yup.string().required(),
  startTime: Yup.string().required(),
  endTime: Yup.string().required(),
  date: Yup.string().required(),
  genre: Yup.string().required(),
  description: Yup.string().required(),
  organizer: Yup.string().required(),
  location: Yup.string().required(),
  isPublic: Yup.boolean().required(),
});
export const JoinSessionSchema = Yup.object({
  jamSessionId: Yup.number().required(),
  musicianEmail: Yup.string().required(),
});
