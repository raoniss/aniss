    const supprime = () => {
        document.querySelectorAll('.js-modal').forEach(a => {
            const target = document.querySelector(a.getAttribute('href'))
                target.style.display = 'none'
            
        })
    }

    const ouvremodal = (e) => {
        let mod = Array.from(document.getElementsByClassName('modal'))
        mod.forEach(a=>{
            a.style.display = "none"
        })
        let al = Array.from(document.getElementsByClassName('js-modal'))
        al.forEach(a=>{
            a.classList.remove("active")
        })
        const target = document.querySelector(e.currentTarget.getAttribute('href'))
        e.currentTarget.classList.toggle("active")
        target.style.display = 'block'
        target.classList.add = ("menu")
    }
    document.querySelectorAll('.js-modal').forEach(a => {
        a.addEventListener('click', ouvremodal);

    })