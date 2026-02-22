import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import './App.css'

function App() {
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)

    // Al cargar la página, obtén el valor del contador
    useEffect(() => {
        const fetchCounter = async () => {
            const { data, error } = await supabase
                .from('counter')
                .select('value')
                .eq('id', 1)
                .single()

            if (error) {
                console.error('Error al obtener contador:', error)
            } else {
                setCount(data?.value || 0)
            }
            setLoading(false)
        }

        fetchCounter()
    }, [])

    // Cuando alguien incremente el contador, actualiza en la BD
    const incrementCounter = async () => {
        const newValue = count + 1
        setCount(newValue)

        // Actualiza en Supabase
        const { error } = await supabase
            .from('counter')
            .update({ value: newValue })
            .eq('id', 1)

        if (error) {
            console.error('Error al actualizar:', error)
            setCount(count) // Revierte si falla
        }
    }

    if (loading) return <p>Cargando contador...</p>

    return (
        <>
            <div>
                <h1>Contador Público</h1>
                <div className="card">
                    <button onClick={incrementCounter}>
                        Contador: {count}
                    </button>
                    <p>Haz clic para incrementar (se guarda en la BD)</p>
                </div>
            </div>
        </>
    )
}

export default App
