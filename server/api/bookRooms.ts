export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  try {
    const response: any = await $fetch(
      'https://bq1nz9nsvk.execute-api.eu-south-1.amazonaws.com/bookrooms',
      {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          payload: {
            startDate: query.startDate,
            endDate: query.endDate,
            fName: query.fName,
            lName: query.lName,
            bookedUnits: query.bookedUnits,
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
