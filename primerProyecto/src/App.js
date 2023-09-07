import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Styles/styles.css"; // Importa el archivo CSS
import imagen1 from "./img/DJANGO.png";
import imagen2 from "./img/MONGO.png";
import imagen3 from "./img/REACT.png";
import nuevaImagen from "./img/central.png"; // Nueva imagen que se agregará al encabezado

const apiUrl = "http://127.0.0.1:8000/computador/";

function App() {
  const [computadoras, setComputadoras] = useState([]);
  const [nuevaComputadora, setNuevaComputadora] = useState({
    ComputadorId: "",
    ComputadorSerial: "",
    ComputadorMarca: "",
  });
  const [editComputadora, setEditComputadora] = useState(null);

  useEffect(() => {
    // GET: Obtener lista de computadoras
    axios
      .get(apiUrl)
      .then((response) => {
        setComputadoras(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  const handleAddComputadora = () => {
    // POST: Agregar una nueva computadora
    axios
      .post(apiUrl, nuevaComputadora)
      .then((response) => {
        setComputadoras([...computadoras, response.data]);
        setNuevaComputadora({
          ComputadorId: "",
          ComputadorSerial: "",
          ComputadorMarca: "",
        });
      })
      .catch((error) => {
        console.error("Error al crear la computadora:", error);
      });
  };

  const handleUpdateComputadora = () => {
    if (!editComputadora) return;

    // PUT: Actualizar una computadora existente
    axios
      .put(`${apiUrl}${editComputadora.ComputadorId}/`, editComputadora)
      .then((response) => {
        const updatedComputadoras = computadoras.map((c) =>
          c.ComputadorId === response.data.ComputadorId ? response.data : c
        );
        setComputadoras(updatedComputadoras);
        setEditComputadora(null);
      })
      .catch((error) => {
        console.error("Error al actualizar la computadora:", error);
      });
  };

  const handleDeleteComputadora = (id) => {
    // DELETE: Eliminar una computadora en la base de datos
    axios
      .delete(`${apiUrl}${id}/`)
      .then(() => {
        // Elimina la computadora de la lista en el frontend
        const updatedComputadoras = computadoras.filter(
          (c) => c.ComputadorId !== id
        );
        setComputadoras(updatedComputadoras);
      })
      .catch((error) => {
        console.error("Error al eliminar la computadora:", error);
      });
  };
  

  const handleRefreshComputadoras = () => {
    // GET: Obtener lista de computadoras actualizada
    axios
      .get(apiUrl)
      .then((response) => {
        setComputadoras(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los datos actualizados:", error);
      });
  };

  return (
    <div>
      <div className="header">
        <img src={imagen1} alt="Imagen 1" />
        <img src={imagen2} alt="Imagen 2" />
        <img src={imagen3} alt="Imagen 3" />
        <img src={nuevaImagen} alt="Nueva Imagen" className="header-right" />
      </div>



      {/* Formulario para agregar una nueva computadora */}
      <div>
        <h2>Nueva Computadora</h2>
        <input
          type="text"
          placeholder="ID"
          value={nuevaComputadora.ComputadorId}
          onChange={(e) =>
            setNuevaComputadora({
              ...nuevaComputadora,
              ComputadorId: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Serial"
          value={nuevaComputadora.ComputadorSerial}
          onChange={(e) =>
            setNuevaComputadora({
              ...nuevaComputadora,
              ComputadorSerial: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Marca"
          value={nuevaComputadora.ComputadorMarca}
          onChange={(e) =>
            setNuevaComputadora({
              ...nuevaComputadora,
              ComputadorMarca: e.target.value,
            })
          }
        />
        <button className="custom-button" onClick={handleAddComputadora}>
          Agregar
        </button>
        <button className="custom-button" onClick={handleRefreshComputadoras}>
          Refresh
        </button>
      </div>

      {/* Tabla de computadoras */}
      <div>
        <h2>Lista de Computadoras</h2>
        <table>
          <thead>
            <tr>
              <th>Índice</th>
              <th>ID</th>
              <th>Serial</th>
              <th>Marca</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {computadoras.map((computadora, index) => (
  <tr key={computadora.id}>
    <td>{index + 1}</td>
    <td>{computadora.ComputadorId}</td>
    <td>{computadora.ComputadorSerial}</td>
    <td>{computadora.ComputadorMarca}</td>
    <td>
      <button onClick={() => setEditComputadora(computadora)}>
        Editar
      </button>
      <button onClick={() => handleDeleteComputadora(computadora.ComputadorId)}>
        Eliminar
      </button>
    </td>
  </tr>
))}
          </tbody>
        </table>
      </div>

      {/* Formulario para editar una computadora */}
      {editComputadora && (
        <div>
          <h2>Editar Computadora</h2>
          <input
            type="text"
            placeholder={`ID (${editComputadora.ComputadorId})`}
            value={editComputadora.ComputadorId}
            onChange={(e) =>
              setEditComputadora({
                ...editComputadora,
                ComputadorId: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder={`Serial (${editComputadora.ComputadorSerial})`}
            value={editComputadora.ComputadorSerial}
            onChange={(e) =>
              setEditComputadora({
                ...editComputadora,
                ComputadorSerial: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder={`Marca (${editComputadora.ComputadorMarca})`}
            value={editComputadora.ComputadorMarca}
            onChange={(e) =>
              setEditComputadora({
                ...editComputadora,
                ComputadorMarca: e.target.value,
              })
            }
          />
          <button className="custom-button" onClick={handleUpdateComputadora}>
            Actualizar
          </button>
          <button className="custom-button" onClick={() => setEditComputadora(null)}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

export default App;