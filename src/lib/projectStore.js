import { supabase } from './supabase'

export async function loadAccountProjects(userId) {
  const { data, error } = await supabase
    .from('projects')
    .select('project_data')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data || []).map((row) => row.project_data)
}

export async function saveAccountProject(userId, project) {
  const { error } = await supabase.from('projects').upsert({
    user_id: userId,
    client_id: project.id,
    title: project.title,
    project_type: project.type || 'Something else',
    stage: project.stage || 'idea',
    progress: project.progress || 0,
    project_data: project,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,client_id' })

  if (error) throw error
}