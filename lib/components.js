function Block ({ position, color, ...rest } = {}) {
  const id = `id_${Math.random().toString().replace('.', '')}`
  console.log('New Block!', id)
  return make({
    type: 'box',
    under: '#table',
    relative: !position,
    id,
    
    class: "throwable",
    dynamicBody,

    position: position || randomTriad({ min: 0.15, max: [0.5, 0.2, 0.4], y: 0.2 }),
    rotation: "0 45 0",
    color: color || randomColor(),
    src: "#light-grid",
    height: "0.1",
    width: "0.1",
    depth: "0.1",
    ...rest,
  })
}

function Bat ({ color, ...props } = {}) {
  return make({
    type: 'cylinder',
    under: '#table',
    relative: false,
    
    class: "throwable",
    dynamicBody,

    position: "0.5 0.5 0",
    rotation: "57 -52 0", 
    radius: "0.025",
    height: "1",
    color: color || randomColor(),
    src: "#light-grid",
    repeat: "5 5",
    ...props,
  })
}


function Target ({ color, sound, ...props } = {}) {
  const effectiveColor = color || randomColor()
  var elem = make({
    type: 'cylinder',
    under: '#table2',
    id: 'clone-btn',
    staticBody,
    radius: "0.1",
    height: "0.1",
    color: effectiveColor,
    src: "#light-grid",
    repeat: "5 5",
    sound,
    ...props
  }, { 
    onCollide: debounce((evt) => {
      const collider = evt.detail.body.el
      const name = collider.name || collider.getAttribute('name')
      
      if (name && (name.includes('hand') || name.includes('bat'))) {
        if (sound) elem.components.sound.playSound();
        Block({ position: "-0.1 1.25 0", color: effectiveColor });
      }
    })
  })
  return elem
}