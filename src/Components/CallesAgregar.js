import React, {useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

export default function CallesAgregar(){

    const [regiones, setRegiones] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    const [regionActual, setRegionActual] = useState();
    const [proHabilitar, setProHabilitar] = useState([]);

    const getRegiones = async () => {//recive las Regiones de la api
        const response = await fetch(`http://localhost:8000/api/regiones`);
        const data = await response.json();
        setRegiones(data);
        //setRegionActual(data[0]);
    }

    const getProvincias = async (id) => {//recive las provincias de una region desde la api
        const response1 = await fetch(`http://localhost:8000/api/regiones/provincias/${id}`);
        const data1 = await response1.json();
        setProvincias(data1);
    }

    const getCiudades = async () => {//recive las Ciudades de una provincia desde la api
        const response2 = await fetch(`http://localhost:8000/api/regiones`);
        const data2 = await response2.json();
        setCiudades(data2);
    }

    useEffect(()=>{
        getRegiones();
    }, []);

    return(
        <div>
            <h1>Agregar calles</h1>
            <FormControl>
                <InputLabel id="Regiones-Disponibles" style = {{left : "10px"}}>Región</InputLabel>
                    <Select
                    style = {{left : "10px"}}
                        labelId="Regiones-Disponibles"
                        id="simple-region"
                        value="regionActual"
                        label="id"
                        sx={{ minWidth: 220 }}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setRegionActual(e.target.value);}
                        }>
                        {regiones.map((region)=>{
                            return <MenuItem value={region.reg_id}>{region.reg_nombre}</MenuItem>
                        })}
                    </Select>
            </FormControl>

            <FormControl>
            <InputLabel id="Provincias-Disponibles" style = {{left : "20px"}}>Provincias</InputLabel>
            <Select
              style = {{left : "20px"}}
              labelId="Provincias-Disponibles"
              id="simple-Provincias"
              value={1}
              label="Provincias"
              sx={{ minWidth: 220 }}>

            </Select>
            </FormControl>

            <FormControl>
            <InputLabel id="Provincias-Disponibles" style = {{left : "30px"}}>Ciudades</InputLabel>
            <Select
              style = {{left : "30px"}}
              labelId="Ciudades-Disponibles"
              id="simple-ciudad"
              value={2}
              label="ciudades"
              sx={{ minWidth: 220 }}>

            </Select>
            </FormControl>
            <Button  style = {{left : "50px"}} variant="contained"> 
                Agregar calle nueva
            </Button>
        </div>
    );
}
