import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import * as React from 'react';

import { FaArrowUp } from "react-icons/fa6";
import { FaLongArrowAltDown } from "react-icons/fa";
import { IoSwapVertical } from "react-icons/io5";
import { TbArrowsUp } from "react-icons/tb";
import { RiSwap3Fill } from "react-icons/ri";
import { GoCopy } from "react-icons/go";
import { FiArrowDown } from "react-icons/fi";


import { TbArrowsDown } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { BsRecordCircle } from "react-icons/bs";


import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import Textarea from '@mui/joy/Textarea';
import Slider from '@mui/joy/Slider';
import Box from '@mui/joy/Box';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';


const Instructions = ({ ops, setA, setB, instructions, setInstructions, setStyle }) => {
    const [numbers, setNumbers] = useState('');
    const editableDivRef = useRef(null);
    const [index, setIndex] = useState(0);
    const instructionRefs = useRef([]);
    const [isRecording, setIsRecording] = useState(false);
    const [InputValue, setInputValue] = useState('');
    const [isStop, setIsStop] = useState(false);
    const [showDash, setShowDash] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(50);
    const intervalRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('big bars');
    const [value, setValue] = React.useState('big bars + labels');


    const getIcon = (inst) => {
        if (inst === 'ra' || inst === 'rb')
            return (<FaArrowUp ></FaArrowUp>)
        if (inst === 'rra' || inst === 'rrb')
            return (<FaLongArrowAltDown ></FaLongArrowAltDown>)
        if (inst === 'sa' || inst === 'sb' || inst == 'ss')
            return (<RiSwap3Fill />)
        if (inst == 'rr')
            return (<TbArrowsUp />)
        if (inst == 'rrr')
            return (<TbArrowsDown />)
        if (inst == 'pb')
            return (<FaArrowRight />)
        if (inst == 'pb')
            return (<FaArrowLeft />)
    }


    useEffect(() => {
        if (instructionRefs.current[index]) {
            instructionRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [index]);
    useEffect(() => {
        if (isStop) {
            clearInterval(intervalRef.current);
        }
    }, [isStop]);

    const setThis = () => {
        setA(numbers.split(' ')
            .map(el => parseInt(el))
            .filter(el => !isNaN(el))
            .filter((el, i, self) => self.indexOf(el) === i))
        setB([]);
    }

    const setInst = (inst) => {
        setInstructions(inst.split('\n'));
    }

    const doInst = (instruction, reverse = false) => {
        const operationMap = {
            'pa': 'pb',
            'pb': 'pa',
            'ra': 'rra',
            'rb': 'rrb',
            'rr': 'rrr',
            'rra': 'ra',
            'rrb': 'rb',
            'rrr': 'rr',
            'sa': 'sa',
            'sb': 'sb',
        };
        const trimmedInstruction = instruction.trim();
        const operation = reverse ? operationMap[trimmedInstruction] : trimmedInstruction;
        if (ops[operation]) {
            ops[operation](false);
        } else {
            console.error(`Invalid instruction: ${trimmedInstruction}`);
        }
    };

    const rand = () => {
        const generateUniqueRandomNumbers = (count, max) => {
            const numbers = Array.from({ length: max }, (_, i) => i + 1);
            for (let i = numbers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
            }
            return numbers.slice(0, count);
        };

        const uniqueNumbers = generateUniqueRandomNumbers(InputValue, 50000);
        setNumbers(uniqueNumbers.join(' '));
    };

    const next = () => {
        if (index < instructions.length - 1) {
            doInst(instructions[index]);
            setIndex(index + 1);
        }
        if (instructions[instructions.length - 1] !== 'END') {
            setInstructions([...instructions, 'END']);
        }
    }

    const prev = () => {
        if (index > 0) {
            doInst(instructions[index - 1], true);
            setIndex(index - 1);
        }
    }



    const play = () => {
        let i = index;
        if (instructions[instructions.length - 1] !== 'END') {
            setInstructions([...instructions, 'END']);
        }
        setIsPlaying(true);
        if (speed === 0)
            for (i = index; i < instructions.length - 1; i++) {
                doInst(instructions[i]);
                setIndex(i + 1);
            }
        intervalRef.current = setInterval(() => {
            if (i < instructions.length - 1) {
                doInst(instructions[i]);
                setIndex(i + 1);
                i++;
            } else {
                clearInterval(intervalRef.current);
                setIsPlaying(false);
            }
        }, speed);
    }

    const stop = () => {
        setIsPlaying(false);
        clearInterval(intervalRef.current);
    }

    const marks = [
        {
            value: 0,
            label: '0ms',
        },
        {
            value: 20,
            label: '200ms',
        },
        {
            value: 50,
            label: '500ms',
        },
        {
            value: 100,
            label: '1s',
        },
    ];

    const handleChange = (event, newValue) => {
        setSpeed(newValue);
        if (isPlaying) {
            stop();
            play();
        }
    };

    const handleelect = (e, n) => {
        setSelectedValue(n)
        setStyle(n)
    }

    return (
        <div className='flex flex-col p-4 gap-2 min-w-1/4'>
            <React.Fragment>
                <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
                    Preferences
                </Button>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={() => setOpen(false)}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Sheet
                        variant="outlined"
                        sx={{ maxWidth: 500, minWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
                    >
                        <ModalClose variant="plain" sx={{ m: 1 }} />
                        <Typography variant="h6" sx={{}}>
                            Select theme
                        </Typography>
                        <div className='flex flex-col gap-2 py-5'>
                            <Select onChange={(e, n) => { handleelect(e, n) }} value={selectedValue}>
                                <Option value="big bars">Big bars</Option>
                                <Option value="big bars + labels">Big bars + labels</Option>
                                <Option value="small bars">small bars</Option>
                            </Select>
                            <Button variant="soft" color="success" onClick={() => setOpen(false)}>Ok</Button>
                        </div>

                    </Sheet>
                </Modal>
            </React.Fragment>
            <Button variant='outlined' endDecorator={< FiArrowDown />} onClick={() => setShowDash(!showDash)}>Toggle Dash</Button>

            {showDash && <div className='flex gap-2 flex-col'>
                <div className='flex flex-col gap-2'>
                    <b>PUSH SWAP VIZUALISER</b>
                    <h4>Generate random numbers</h4>
                    <Input value={InputValue} onChange={(e) => setInputValue(e.target.value)} type="number" placeholder='How many numbers ?' />


                    <div className='flex gap-2'>
                        <Button variant="soft" onClick={rand}>Random</Button>
                        <Button variant="soft">Assending</Button>
                        <Button variant="soft">Desending</Button>
                        <Dropdown >
                            <MenuButton variant="soft">More</MenuButton>
                            <Menu>
                                <MenuItem>Test 1</MenuItem>
                                <MenuItem>Test 2</MenuItem>
                                <MenuItem>Test 3</MenuItem>

                            </Menu>
                        </Dropdown>                
                    </div>

                </div>  
                <div className='flex flex-col gap-2'>
                    <b>Numbers</b>
                    <Input type='text' placeholder='Numbers' value={numbers} onChange={(e) => setNumbers(e.target.value)}></Input>
                    <div className='flex gap-2'>
                        <Button startDecorator={<GoCopy />}
                            sx={{
                                "--Button-gap": "8px"
                            }}>Copy </Button>
                        <Button onClick={setThis}>Set numbers</Button>
                    </div>

                </div>
                <div className='flex flex-col gap-2'>
                    <Button variant={isRecording ? "solid" : "soft"} color='danger' startDecorator={<BsRecordCircle />} onClick={() => setIsRecording(!isRecording)}>
                        {isRecording ? 'Stop recording' : 'Start recording'}
                    </Button>
                    <ToggleButtonGroup
                        size={value || undefined}
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue); setStyle(newValue);
                        }}
                    >
                        <Button value="small bars">small</Button>
                        <Button value="big bars">big</Button>
                        <Button value="big bars + labels">big + labels</Button>
                    </ToggleButtonGroup>
                    <div className='flex flex-col gap-2'>
                        <div className='flex gap-2'>
                            <Button variant='outlined' className='flex' onClick={() => ops.pa(isRecording)}>pa <FaArrowLeft /></Button>
                            <Button variant='outlined' className='flex' onClick={() => ops.pb(isRecording)}>pb <FaArrowRight /> </Button>
                        </div>

                        <div className='flex gap-2'>
                            <Button variant='outlined' className='flex' onClick={() => ops.ra(isRecording)}>ra  <FaArrowUp /> </Button>
                            <Button variant='outlined' className='flex' onClick={() => ops.rb(isRecording)}>rb  <FaArrowUp /> </Button>
                            <Button variant='outlined' className='flex' onClick={() => ops.rr(isRecording)}>rr  <TbArrowsUp /></Button> <br />
                        </div>

                        <div className='flex gap-2'>
                            <Button variant='outlined' className='flex' onClick={() => ops.rra(isRecording)}>rra  <FaLongArrowAltDown />  </Button>
                            <Button variant='outlined' className='flex' onClick={() => ops.rrb(isRecording)}>rrb  <FaLongArrowAltDown /> </Button>
                            <Button variant='outlined' className='flex' onClick={() => ops.rrr(isRecording)}>rrr <TbArrowsDown /> </Button> <br />
                        </div>

                        <div className='flex gap-2'>
                            <Button variant='outlined' className='flex' onClick={() => ops.sa(isRecording)}>sa <RiSwap3Fill /> </Button>
                            <Button variant='outlined' className='flex' onClick={() => ops.sb(isRecording)}>sb  <RiSwap3Fill /> </Button>
                            <Button variant='outlined' className='flex' onClick={() => ops.ss(isRecording)}>ss  <RiSwap3Fill /> </Button>
                        </div>
                    </div>
                </div>

                <Textarea
                    minRows={4}
                    maxRows={6}
                    ref={editableDivRef}
                    contentEditable='true'
                    value={instructions.join('\n')}
                    onChange={(e) => setInst(e.target.value)}
                    className='editable-div'
                    style={{ border: '1px solid black', padding: '10px', minHeight: '50px' }}
                >
                </Textarea>
            </div>}

            <Box className='p-4' sx={{ width: 300 }}>
                Speed
                <Slider
                    aria-label="Always visible"
                    defaultValue={speed}
                    step={1}
                    onChange={(e, n) => handleChange(e, n)}
                    marks={marks}
                    valueLabelDisplay="auto"
                />
            </Box>
            <div className='flex gap-2 justify-start'>
                <Button disabled={isPlaying || index == instructions.length - 1} onClick={() => play()}>play</Button>
                <Button disabled={!isPlaying} onClick={() => stop()}>pause</Button>
                <Button onClick={prev}>prev</Button>
                <Button onClick={next}>next</Button>
                <Button onClick={() => { setIndex(0); stop(); setThis() }}>reload</Button>

            </div>
            <div
                className='editable-div flex flex-wrap justify-start items-start gap-2 gap-y-2'
            >
                {/* {instructions.map((ins, i) => (
                    <div
                        key={i}
                        ref={el => instructionRefs.current[i] = el}
                        className={`w-full h-4 ${i == index ? 'active' : ''}`}
                    >
                        {ins}
                    </div>
                ))} */}
            </div>
        </div>
    );
};

Instructions.propTypes = {
    ops: PropTypes.shape({
        pa: PropTypes.func.isRequired,
        pb: PropTypes.func.isRequired,
        ra: PropTypes.func.isRequired,
        rb: PropTypes.func.isRequired,
        rr: PropTypes.func.isRequired,
        rra: PropTypes.func.isRequired,
        rrb: PropTypes.func.isRequired,
        rrr: PropTypes.func.isRequired,
        sa: PropTypes.func.isRequired,
        sb: PropTypes.func.isRequired,
    }).isRequired,
    setA: PropTypes.func.isRequired,
    setB: PropTypes.func.isRequired,
    instructions: PropTypes.array.isRequired,
    setInstructions: PropTypes.func.isRequired,
};

export default Instructions;