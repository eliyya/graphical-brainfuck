const nid = () => Math.random().toString(36).slice(-9) //generador de ID
i = 0                   // indice
p = 0                   // puntero
m = [{id:nid(), v:0}]   // memoria
o = ''
const action = (act) => {
    if(act=='+') { //si la instrucion es '+'
        if (m[p]) { //si el espacio en memoria existe
            m[p].v++ //aumenta 1 bit
        } else { //si no
            m[p] = {id: nid(), v: 1} //crea el espacio en memoria
        }
        // if(document) document.getElementById('mp').children[p].innerHTML = `[${m[p].v}]`
    } else if(act=='-') { //si la instrucion es '-'
        if(m[p]) { //si el espacio en memoria existe
            m[p].v-- //disminuye 1 bit
        } else { //si no
            m[p] = {id: nid(), v: -1} //crea el espacio en memoria
        }
        // // if(document) document.getElementById('mp').children[p].innerHTML = `[${m[p].v}]`
    } else if(act=='>') { //si la instrucion es '>'
        p++ // aumenta el puntero
        // if(!m[p]) {
        //     m[p] = {id: nid(), v: -1}
            // if(document) {
            //     document.getElementById('mp').innerHTML = document.getElementById('mp').innerHTML+'\n<td>[0]</td>'
            //     document.getElementById('p').innerHTML = document.getElementById('mp').innerHTML+'\n<td> </td>'
        //         renderPointer()
        //     }
        // }
        // if(!m[p] && document) {
            // // document.getElementById('mp').innerHTML = document.getElementById('mp').innerHTML+'\n<td>[0]</td>'
            // // document.getElementById('p').innerHTML = document.getElementById('mp').innerHTML+'\n<td> </td>'

        // }
        renderPointer(p)
    } else if(act=='<') { //si la instrucion es '<'
        if(p==0) { //si el puntero apunta al primer elemente
            m.unshift({id: nid(), v: 0})//crea un espaccio en memoria
            // if(document) {
                // document.getElementById('mp').innerHTML = '<td>[0]</td>\n'+document.getElementById('mp').innerHTML
                // document.getElementById('p').innerHTML = document.getElementById('mp').innerHTML+'\n<td> </td>'
                // renderPointer(p)
            // }
        } else { //si no
            p-- //disminuye el puntero
            renderPointer(p)
        }
    } else if(act=='.') { //si la instrucion es '.'
        o+=String.fromCharCode(m[p].v) // añade el valor al output
        // // if(document)document.getElementById('bfout').value = o
    }
}
const renderPointer = (pt) => {
    // if(document) {
        // for (let j = 0; j < document.getElementById('p').children.length; j++) {
            // if(j==pt) {
                // document.getElementById('p').children[j].innerHTML = '^'
            // } else {
                // document.getElementById('p').children[j].innerHTML = ' '
            // }
        // }
    // }
}
const compile = async (input = '') => {
    c = [...input]          // codigo// output
    // if(document) {
        for (const l of c) {
            // document.getElementById('cint').innerHTML += `<label class="r" style="padding: 2px">${l}</label>`
        }
        // document.getElementById('cint')
    // }
    while (i < c.length) {//ciclo principal que recorre los caracteres
        // console.log(c[i])
        await new Promise(resolve => setTimeout(resolve, 1000)) // sleep
        // // if(document) for (const inputElement of document.getElementsByClassName('fc')) inputElement.classList.remove('fc')
        // // if(document) document.getElementById('cint').children[i].classList.add('fc')
        if(['+','-','.','>','<'].includes(c[i])){
            action(c[i])
        } else if(c[i]=='[') { //si la instrucion es '['
            await resolveFor(i, p)  //ejeccuta el for y espera a que termine
        }
        i++ // aumenta el indice del codigo
    }
    console.log(m.map(s=>s.v)) //imprime la memoria
    console.log(o) //imprime el output
    // if(document) {
        // document.getElementById('bfout').value = o
        // document.getElementById('bff').classList.remove('d-n')
        // document.getElementById('cin').classList.add('d-n')
    // }
}

const resolveFor = (start, position) => {
    const pid = m[position].id //obtiene la posicion por id del inicio del for
    return new Promise(async resolve => {
        i++ // aumenta el indice del codigo
        while (i < c.length) { // ciclo del bucle
            // console.log(c[i])
            await new Promise(resolve => setTimeout(resolve,500)) // sleep
            // // if(document) for (const inputElement of document.getElementsByClassName('fcs')) inputElement.classList.remove('fcs')
            // // if(document) document.getElementById('cint').children[i].classList.add('fcs')
            if(['+','-','.','>','<'].includes(c[i])){
                action(c[i])
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
        // // if(document) for (const inputElement of document.getElementsByClassName('fcs')) inputElement.classList.remove('fcs')
        resolve() // termina el ciclo
    })
}

// compile('++++++++++[>+>+++>+++++++>++++++++++<<<<-]>>>++.>+.+++++++..+++.<<++.>+++++++++++++++.>.+++.------.--------.<<+.<.') //entrada del codigo