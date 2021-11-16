const {generate:nid} = require('shortid');
const compile = async (input = '') => {
    c = [...input]      // codigo
    i = 0               // indice
    p = 0               // puntero
    m = [{id:nid(), v:0}]             // memoria
    o = ''              //output
    while (true) {
        if(!c[i]) break;
        console.log(c[i])
        await new Promise(resolve => setTimeout(resolve,500))
        if(c[i]=='+') {
            if (m[p]) {
                m[p].v++
            } else {
                m[p] = {id: nid(), v: 1}
            }
        } else if(c[i]=='-') {
            if(m[p]) {
                m[p].v--
            } else {
                m[p] = {id: nid(), v: -1}
            }
        } else if(c[i]=='>') {
            p++
        } else if(c[i]=='<') {
            if(p==0) {
                m.unshift(0)
            } else {
                p--
            }
        } else if(c[i]=='.') {
            o+=String.fromCharCode(m[p].v)
        } else if(c[i]=='[') {
            await resolveFor(i, p)
        }
        i++
    }
    console.log(m)
    console.log(o)
}

const resolveFor = (start, position) => {
    const pid = m[position].id
    return new Promise(async resolve => {
        while (true) {
            i++
            if(!c[i]) break;
            console.log(c[i])
            await new Promise(resolve => setTimeout(resolve,100))
            if(c[i]=='+') {
                if (m[p]) {
                    m[p].v++
                } else {
                    m[p] = {id: nid(), v: 1}
                }
            } else if(c[i]=='-') {
                if(m[p]) {
                    m[p].v--
                } else {
                    m[p] = {id: nid(), v: -1}
                }
            } else if(c[i]=='>') {
                p++
            } else if(c[i]=='<') {
                if(p==0) {
                    m.unshift(0)
                } else {
                    p--
                }
            } else if(c[i]=='.') {
                o+=String.fromCharCode(m[p].v)
            } else if(c[i]=='[') {
                await resolveFor(i, p)
            } else if(c[i]==']') {
                console.log(m.find(mi=>mi.id==pid))
                if(m.find(mi=>mi.id==pid).v<=0) {
                    break;
                } else {
                    i = start
                }
            }
        }
        resolve()
    })
}

compile('++++++++++[>+>+++>+++++++>++++++++++<<<<-]>>>++.>+.+++++++..+++.<<++.>+++++++++++++++.>.+++.------.--------.<<+.<.')