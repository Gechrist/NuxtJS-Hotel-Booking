export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  try {
    const response: string = await $fetch(
      'https://bq1nz9nsvk.execute-api.eu-south-1.amazonaws.com/rooms',
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          payload: {
            startDate: query.startDate,
            endDate: query.endDate,
          },
        }),
      }
    );
    const result = JSON.parse(response);
    return result;
  } catch (e) {
    return e.message;
  }
});
