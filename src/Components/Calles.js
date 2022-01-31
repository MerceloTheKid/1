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


export default function CallesMostrar(){

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
    }, []);
    
         
    return(
        
        <div>
            <h1>Listado de calles</h1>
            <div>
            
</div>
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
