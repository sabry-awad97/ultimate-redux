let _id = 1;
export const uniqueId = () => _id++;

export const createTask = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => ({
  type: 'CREATE_TASK',
  payload: {
    id: uniqueId(),
    title,
    description,
    status: 'Unstarted',
  },
});
