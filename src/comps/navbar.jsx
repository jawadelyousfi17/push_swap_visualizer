import { useEffect, useState } from 'react';
import { IoIosBug } from "react-icons/io";
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { Avatar, Button, IconButton, Option, Select } from '@mui/joy'

import { Si42 } from "react-icons/si";

import { MdOutlineWbSunny } from "react-icons/md";

import { RxOpenInNewWindow } from "react-icons/rx";

import { IoMoonOutline } from "react-icons/io5";

import { IoLogoGithub } from "react-icons/io";
import { FaStar } from "react-icons/fa";

const Navbar = ({ theme, handleTheme, mode, setMode }) => {
    // Color mode comes from localStorage, so only render mode-dependent UI after mount
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    function setT() {
        if (mode === 'dark')
            setMode('light')
        else setMode('dark')
    }

    return (
        <div className='flex h-14 w-auto justify-between items-center gap-4 px-12' >
            <Typography level="h2" sx={{ fontSize: 'xl', mb: 0.5 }}>
                Push swap visualizer
            </Typography>
            <div className="flex gap-2">
                <IconButton onClick={setT} variant="outlined"  >

                    {mounted && mode === 'dark' && <MdOutlineWbSunny />
                    }
                    {mounted && mode === 'light' && <IoMoonOutline />
                    }                </IconButton>

                <Select value={theme} onChange={handleTheme}>
                    <Option value="default">Default</Option>
                    <Option value="red">Red</Option>
                    <Option value="blue">Blue</Option>
                    <Option value="green">Green</Option>
                    <Option value="rebecca">Rebecca Purple</Option>
                </Select>
                
                <Button 
                    component="a" 
                    href="https://github.com/jawadelyousfi17/push_swap_visualizer" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    color='warning' 
                    variant='soft' 
                    startDecorator={<FaStar />}
                >
                    Star on GitHub
                </Button>
                
                <Button component="a" href="https://github.com/jawadelyousfi17/push_swap_visualizer/issues" target="_blank" rel="noopener noreferrer" color='neutral' variant='plain' endDecorator={<RxOpenInNewWindow />}>Report bugs</Button>

            </div>

            <div className="flex">
                <Button component="a" href="https://profile.intra.42.fr/users/jel-yous" color='neutral' variant='plain' endDecorator={<Si42 />}>M with ❤ By jel-yous [1337]</Button>
            </div>

        </div>
    )
}

export default Navbar