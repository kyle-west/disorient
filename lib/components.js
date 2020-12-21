function Block ({ position, name = "", sound = "src: #splat-sound", color, ...rest } = {}, { onCollide, ...events } = {}) {
  const collide = debounce((evt) => {
    const { components } = evt.currentTarget;
    if (sound) components.sound.playSound();
    onCollide && onCollide(evt);
  }, { time: 50 })

  return make({
    name: `Block${name}`,
    type: 'box',
    under: '#table',
    relative: !position,
    
    class: "throwable",
    dynamicBody,

    position: position || randomTriad({ min: 0.15, max: [0.5, 0.2, 0.4], y: 0.2 }),
    rotation: "0 45 0",
    color: color || randomColor(),
    src: "#light-grid",
    height: "0.1",
    width: "0.1",
    depth: "0.1",
    sound,
    ...rest,
  }, {
    onCollide: collide,
    'hover-end': collide,
    ...events,
  })
}

function Bat ({ color, sound, name = "", ...props } = {}, { onCollide, ...events } = {}) {
  return make({
    name: `Bat${name}`,
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
    sound,
    ...props,
  }, {
    onCollide: debounce((evt) => {
      const { components } = evt.currentTarget;
      if (sound) components.sound.playSound();
      onCollide && onCollide(evt);
    }),
    ...events,
  })
}


function Target ({ color, name = "", sound = "src: #hit-sound", ...props } = {}, { onCollide, ...events } = {}) {
  const effectiveColor = color || randomColor();

  const collide = debounce((evt) => {
    const { components } = evt.currentTarget;
    const collider = evt.detail.body.el;
    const name = collider.name || collider.getAttribute('name');

    if (name && (name.includes('hand') || name.includes('Bat'))) {
      if (sound) components.sound.playSound();
      Block({ position: "-0.1 1.25 0", color: effectiveColor });
      onCollide && onCollide(evt);
    }
  }, { time: 500 })

  return make({
    name: `Target${name}`,
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
    onCollide: collide,
    'hover-end': collide,
    ...events,
  })
}