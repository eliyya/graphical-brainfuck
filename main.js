const {generate:nid} = require('shortid'); //generador de ID
const compile = async (input = '') => {
    c = [...input]          // codigo
    i = 0                   // indice
    p = 0                   // puntero
    m = [{id:nid(), v:0}]   // memoria
    o = ''                  // output
    while (i < c.length) {//ciclo principal que recorre los caracteres
        console.log(c[i])
        await new Promise(resolve => setTimeout(resolve,500)) // sleep
        if(c[i]=='+') { //si la instrucion es '+'
            if (m[p]) { //si el espacio en memoria existe
                m[p].v++ //aumenta 1 bit
            } else { //si no
                m[p] = {id: nid(), v: 1} //crea el espacio en memoria
            }
        } else if(c[i]=='-') { //si la instrucion es '-'
            if(m[p]) { //si el espacio en memoria existe
                m[p].v-- //disminuye 1 bit
            } else { //si no
                m[p] = {id: nid(), v: -1} //crea el espacio en memoria
            }
        } else if(c[i]=='>') { //si la instrucion es '>'
            p++ // aumenta el puntero
        } else if(c[i]=='<') { //si la instrucion es '<'
            if(p==0) { //si el puntero apunta al primer elemente
                m.unshift({id: nid(), v: 0})//crea un espaccio en memoria
            } else { //si no
                p-- //disminuye el puntero
            }
        } else if(c[i]=='.') { //si la instrucion es '.'
            o+=String.fromCharCode(m[p].v) // añade el valor al output
        } else if(c[i]=='[') { //si la instrucion es '['
            await resolveFor(i, p)  //ejeccuta el for y espera a que termine
        }
        i++ // aumenta el indice del codigo
    }
    console.log(m.map(s=>s.v)) //imprime la memoria
    console.log(o) //imprime el output
}

const resolveFor = (start, position) => {
    const pid = m[position].id //obtiene la posicion por id del inicio del for
    return new Promise(async resolve => {
        i++ // aumenta el indice del codigo
        while (i < c.length) { // ciclo del bucle
            console.log(c[i])
            await new Promise(resolve => setTimeout(resolve,100)) // sleep
            if(c[i]=='+') { //si la instrucion es '+'
                if (m[p]) { //si el espacio en memoria existe
                    m[p].v++ //aumenta 1 bit
                } else { //si no
                    m[p] = {id: nid(), v: 1} //crea el espacio en memoria
                }
            } else if(c[i]=='-') { //si la instrucion es '-'
                if(m[p]) { //si el espacio en memoria existe
                    m[p].v-- //disminuye 1 bit
                } else { //si no
                    m[p] = {id: nid(), v: -1} //crea el espacio en memoria
                }
            } else if(c[i]=='>') { //si la instrucion es '>'
                p++ // aumenta el puntero
            } else if(c[i]=='<') { //si la instrucion es '<'
                if(p==0) { //si el puntero apunta al primer elemente
                    m.unshift({id: nid(), v: 0})//crea un espaccio en memoria
                } else { //si no
                    p-- //disminuye el puntero
                }
            } else if(c[i]=='.') { //si la instrucion es '.'
                o+=String.fromCharCode(m[p].v) // añade el valor al output
            } else if(c[i]=='[') { //si la instrucion es '['
                await resolveFor(i, p)  //ejeccuta el for y espera a que termine
            } else if(c[i]==']') { //si la instrucion es '['
                if(m.find(mi=>mi.id==pid).v<=0) { // revisa que el inici del for sea 0
                    break; // termina el for
                } else { //si no
                    i = start //vuelve a ejecutar el ciclo
                }
            }
            i++ // aumenta el indice del codigo
        }
        resolve() // termina el ciclo
    })
}

compile('++++++++++[>+>+++>+++++++>++++++++++<<<<-]>>>++.>+.+++++++..+++.<<++.>+++++++++++++++.>.+++.------.--------.<<+.<.') //entrada del codigo