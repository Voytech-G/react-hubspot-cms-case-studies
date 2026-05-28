exports.main = async (context) => {
  const token = process.env.PRIVATE_APP_ACCESS_TOKEN;

  if (!token) {
    return {
      statusCode: 500,
      body: {
        error:
          'PRIVATE_APP_ACCESS_TOKEN is not set. Did you install the app in the portal after hs project upload?',
      },
    };
  }

  const limit = Number(context.query?.limit ?? 10);

  const url = new URL('https://api.hubapi.com/crm/v3/objects/contacts');
  url.searchParams.set('limit', String(Math.min(Math.max(limit, 1), 100)));
  url.searchParams.set('properties', 'firstname,lastname,email,company');
  url.searchParams.set('archived', 'false');

  try {
    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: { error: 'HubSpot API error', detail: data },
      };
    }

    const contacts = (data?.results ?? []).map((row) => ({
      id: row?.id ?? '',
      name:
        [row?.properties?.firstname, row?.properties?.lastname]
          .filter(Boolean)
          .join(' ') || '(no name)',
      email: row?.properties?.email ?? '',
      company: row?.properties?.company ?? '',
    }));

    return {
      statusCode: 200,
      body: { contacts },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: { error: 'Fetch failed', detail: String(err) },
    };
  }
};
