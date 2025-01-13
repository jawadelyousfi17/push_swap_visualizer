class Sop {
    constructor(a, b, setA, setB, setInstructions) {
        this.a = a;
        this.b = b;
        this.setA = setA;
        this.setB = setB;
        this.setInstructions = setInstructions;
    }

    addInstruction(instruction) {
        this.setInstructions(prev => [...prev, instruction]);
    }

    sa(addInstr = true) {
        if (this.a.length > 1) {
            [this.a[0], this.a[1]] = [this.a[1], this.a[0]];
            this.setA([...this.a]);
            if (addInstr) this.addInstruction('sa');
        }
    }

    sb(addInstr = true) {
        if (this.b.length > 1) {
            [this.b[0], this.b[1]] = [this.b[1], this.b[0]];
            this.setB([...this.b]);
            if (addInstr) this.addInstruction('sb');
        }
    }

    ss(addInstr = true) {
        this.sa(false);
        this.sb(false);
        if (addInstr) this.addInstruction('ss');
    }

    pa(addInstr = true) {
        if (this.b.length > 0) {
            this.a.unshift(this.b.shift());
            this.setA([...this.a]);
            this.setB([...this.b]);
            if(addInstr) this.addInstruction('pa');
        }
    }

    pb(addInstr = true) {
        if (this.a.length > 0) {
            this.b.unshift(this.a.shift());
            this.setA([...this.a]);
            this.setB([...this.b]);
           if(addInstr) this.addInstruction('pb');
        }
    }

    ra(addInstr = true) {
        if (this.a.length > 0) {
            this.a.push(this.a.shift());
            this.setA([...this.a]);
            if (addInstr) this.addInstruction('ra');
        }
    }

    rb(addInstr = true) {
        if (this.b.length > 0) {
            this.b.push(this.b.shift());
            this.setB([...this.b]);
            if (addInstr) this.addInstruction('rb');
        }
    }

    rr(addInstr = true) {
        this.ra(false);
        this.rb(false);
        if (addInstr) this.addInstruction('rr');
    }

    rra(addInstr = true) {
        if (this.a.length > 0) {
            this.a.unshift(this.a.pop());
            this.setA([...this.a]);
            if (addInstr) this.addInstruction('rra');
        }
    }

    rrb(addInstr = true) {
        if (this.b.length > 0) {
            this.b.unshift(this.b.pop());
            this.setB([...this.b]);
            if (addInstr) this.addInstruction('rrb');
        }
    }

    rrr(addInstr = true) {
        this.rra(false);
        this.rrb(false);
        if(addInstr) this.addInstruction('rrr');
    }
}

export default Sop;