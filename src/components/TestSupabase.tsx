import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function TestSupabase() {
    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEmployees = async () => {
            const { data, error } = await supabase
                .from('employees')
                .select('*')

            if (error) {
                console.error('Error:', error)
            } else {
                setEmployees(data || [])
            }
            setLoading(false)
        }

        fetchEmployees()
    }, [])

    if (loading) return <p>Cargando...</p>
    return <pre>{JSON.stringify(employees, null, 2)}</pre>
}
