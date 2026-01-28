const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

async function callEdgeFunction(functionName: string, method: string, payload?: any) {
  const url = `${SUPABASE_URL}/functions/v1/${functionName}`

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: payload ? JSON.stringify(payload) : undefined,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Function call failed')
  }

  return response.json()
}

export const eventApi = {
  create: (data: any) => callEdgeFunction('create-event', 'POST', data),
  update: (data: any) => callEdgeFunction('update-event', 'POST', data),
  delete: (id: string) => callEdgeFunction('delete-event', 'POST', { id }),
}

export const clientApi = {
  create: (data: any) => callEdgeFunction('create-client', 'POST', data),
  update: (data: any) => callEdgeFunction('update-client', 'POST', data),
  delete: (id: string) => callEdgeFunction('delete-client', 'POST', { id }),
}

export const pipelineApi = {
  create: (data: any) => callEdgeFunction('create-pipeline', 'POST', data),
  update: (data: any) => callEdgeFunction('update-pipeline', 'POST', data),
  delete: (id: string) => callEdgeFunction('delete-pipeline', 'POST', { id }),
}

export const inventoryApi = {
  create: (data: any) => callEdgeFunction('create-inventory', 'POST', data),
  update: (data: any) => callEdgeFunction('update-inventory', 'POST', data),
  delete: (id: string) => callEdgeFunction('delete-inventory', 'POST', { id }),
}
