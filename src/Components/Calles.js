import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function CallesMostrar(){
    const [regiones, setRegiones] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [ciudades, setCiudades] = useState([]);

    const [regionActual, setRegionActual] = useState();
    const [provinciaActual, setProvinciaActual] = useState();
    const [ciudadActual, setCiudadActual] = useState();
    const [nombreCalle, setNombreCalle] = useState('');

    const [provinciaUsar, setProvinciaUsar] = useState(true);
    const [ciudadUsar, setCiudadUsar] = useState(true);
    const [calleUsar, setCalleUsar] = useState(true);

    const getRegiones = async () => {//recive las Regiones de la api
        const response = await fetch(`http://localhost:8000/api/regiones`);
        const data = await response.json();
        setRegiones(data);
    }
    const getProvincias = async (id) => {
        console.log(id);
        const response = await fetch(`http://localhost:8000/api/regiones/provincias/${id}`);
        const data = await response.json();
        setProvincias(data);
    }

    const getCiudades = async (id) => {//recive las Ciudades de una provincia desde la api
        const response2 = await fetch(`http://localhost:8000/api/provincias/ciudades/${id}`);
        const data2 = await response2.json();
        setCiudades(data2);
        setCiudadActual(data2[0]);
    }

    function agregarCalle(){
        
        const response = fetch(`http://localhost:8000/api/calles/`,{
            method: 'post',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({  cal_nombre: nombreCalle, ciu_id: ciudadActual})
        }).then((response) =>{
            if(response.status == 201){
                getCalles();
            }else{
                getCalles();
            }})
    }
    const [counter, setCounter] = useState([]);
    const [eliminar, setEliminar] = useState([]);
    
    const getCalles = async () => {//recive las calles de la api
        const response = await fetch(`http://localhost:8000/api/calle/datos`);
        const data = await response.json();
        setCounter(data);
    }

    function eliminarCalles(id){
        
        const response = fetch(`http://localhost:8000/api/calles/${id}`,{
            method: 'delete'
        }).then((response) =>{
        if(response.status == 200){

            getCalles();

        }else{
            console.log("Fallado");
        }}); 
    }
    //Variables y funciones para modificar calle:
    const [abierto, setAbierto] = useState(false);
    const handleAbierto = () => {setAbierto(true)};
    const handleCierre = () => {setAbierto(false)};
    const [callesita, setCallesita] = useState();
    const [callesita2, setCallesita2] = useState();
    const [ciudadsita, setCiudadsita] = useState();

    function modificarCalles(id){
        const response = fetch(`http://localhost:8000/api/calles/${id}`,{
            method: 'put',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: callesita , ciu_id: ciudadsita, cal_nombre: callesita2})}
        ).then((response) =>{
        if(response.status == 200){
            handleCierre();
            getCalles();

        }else{
            console.log("Modificacion fallida");
        }})

    }


    useEffect(()=>{
        getCalles();
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
                        value={regionActual}
                        label="Regiones"
                        sx={{ minWidth: 220 }}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setRegionActual(e.target.value);
                            getProvincias(e.target.value);
                            getCiudades(e.target.value);
                            setProvinciaUsar(false);
                            setCiudadUsar(true);
                            setCalleUsar(true);
                        }
                        }>
                        {regiones.map((region)=>{
                            return <MenuItem value={region.id}>{region.reg_nombre}</MenuItem>
                        })}
                    </Select>
            </FormControl>

            <FormControl>
            <InputLabel id="Provincias-Disponibles" style = {{left : "20px"}}>Provincias</InputLabel>
            <Select
                style = {{left : "20px"}}
                labelId="Provincias-Disponibles"
                disabled = {provinciaUsar}
                id="simple-Provincias"
                value={provinciaActual}
                label="Provincias"
                sx={{ minWidth: 220 }}
                onChange={(e) => {
                        setProvinciaActual(e.target.value);
                        getCiudades(e.target.value);
                        setCiudadUsar(false);
                        setCalleUsar(true);
                    }
                }>
                {provincias.map((provincia)=>{
                    return <MenuItem value={provincia.id}>{provincia.pro_nombre}</MenuItem>
                })}
            </Select>
            </FormControl>

            <FormControl>
            <InputLabel id="Provincias-Disponibles" style = {{left : "30px"}}>Ciudades</InputLabel>
            <Select
              style = {{left : "30px"}}
              labelId="Ciudades-Disponibles"
              id="simple-ciudad"
              disabled = {ciudadUsar}
              value={ciudadActual}
              label="ciudades"
              sx={{ minWidth: 220 }}
                onChange={(e) => {
                        setCiudadActual(e.target.value);
                        setCalleUsar(false);
                    }
                }>
                {ciudades.map((ciudad)=>{
                    return <MenuItem value={ciudad.id}>{ciudad.ciu_nombre}</MenuItem>
                })}
            </Select>
            </FormControl>
            <FormControl style = {{left : "40px"}}>
                <div>
                
                    <TextField
                        disabled = {calleUsar}
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue={nombreCalle}
                        onChange={e => setNombreCalle(e.target.value)}
                        
                    />
                    <Button variant="contained" 
                    disabled = {calleUsar}
                    onClick={() => agregarCalle(ciudadActual.id)}
                    style = {{left : "10px"}}> 
                        Agregar calle
                    </Button>
                </div>
            </FormControl>
            
            <h1>Listado de calles</h1>
            
            <TableContainer component={Paper}>
            <Table sx={{minWidth: 650 }} aria-label= "Calles Existentes">
                    <TableHead>
                        <TableRow>
                            <TableCell>Región</TableCell>
                            <TableCell>Provincia</TableCell>
                            <TableCell>Ciudad</TableCell>
                            <TableCell>Calle</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    
                    </TableHead>
            
                <TableBody>
                    {counter.map((row) =>(
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell>{row.reg_nombre}</TableCell>
                        <TableCell>{row.pro_nombre}</TableCell>
                        <TableCell>{row.ciu_nombre}</TableCell>
                        <TableCell>{row.cal_nombre}</TableCell>
                        <TableCell>
                            <Button variant="contained" onClick={() => eliminarCalles(row.id)} >Eliminar</Button>
                            <Button 
                                variant="contained" 
                                style = {{left : "10px"}}
                                onClick={() => {
                                    setCallesita(row.id);
                                    setCallesita2(row.cal_nombre);
                                    setCiudadsita(row.ciu_id);
                                    handleAbierto();
                                }}>
                                    Modificar
                                </Button>
                                <Modal
                                    open={abierto}
                                    onClose={handleCierre}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description">  
                                    <Box
                                        component="form"
                                        autoComplete="off"
                                        sx = {{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            width: 400,
                                            bgcolor: 'background.paper',
                                            border: '2px solid #000',
                                            boxShadow: 24,
                                            p: 4,
                                        }}>
                                        
                                        <FormControl>
                                            <div>
                                            <div><b>Nombre a modificar</b></div>
                                            
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Required"
                                                    defaultValue={callesita2}
                                                    onChange={e => setCallesita2(e.target.value)}
                                                />
                                                <Button variant="contained" 
                                                
                                                onClick={() => modificarCalles(callesita)}> 
                                                    Enviar Modificacion
                                                </Button>
                                            </div>
                                            </FormControl>
                                    </Box>
                                </Modal>
                        </TableCell>
                        </TableRow>
                    ))}
                    
                    
                </TableBody>
                </Table>
            </TableContainer>
            
        </div>
    );

    

}
