import { useState, useEffect } from 'react';

function App() {
  const [nombre, setNombre] = useState('');
  const [saludo, setSaludo] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setNombre(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaludo('');

    try {
      // Validar nombre
      const validarNombre = await fetch(`http://localhost:5000/validar/${nombre}`);
      const resultado = await validarNombre.json();
      if (!resultado.isValid) {
        setError('Nombre no válido.');
        return;
      }
      const saludo = await fetch(`http://localhost:5000/saludo/${nombre}`);
      const mensaje = await saludo.text();
      setSaludo(mensaje);
    } catch (err) {
      console.error('Error al hacer la solicitud:', err);
    }
  };

  useEffect(() => {
    if (saludo) {
      console.log(`Saludo recibido: ${saludo}`);
    }}, [saludo]);

  return (
    <div>
      <h1>Bienvenido</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={nombre} onChange={handleChange} placeholder="Escribe tu nombre"/>
        <button type="submit">Enviar</button>
      </form>
      {error && <p style={{ color: 'violet' }}>{error}</p>}
      {saludo && <p id='respuesta'>{saludo}</p>}
    </div>
  );
}
export default App;
