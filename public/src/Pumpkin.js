import Prop from "./Prop.js";

export default class Pumpkin extends Prop {
    
    constructor(data) {
        const { scene, prop } = data;
        const drops = JSON.parse(prop.properties.find(p=>p.name=='drops').value);
        const depth = prop.properties.find(p=>p.name=='depth').value;
        super({
            name: prop.type,
            scene,
            x: prop.x,
            y: prop.y, 
            texure: 'foliage',
            frame: prop.type,
            drops,
            depth 
        });

        const yOrigin = prop.properties.find(p=>p.name == 'yOrigin').value;
        this.y = this.y + this.height * (yOrigin - 0.5);
        
        const { Bodies } = Phaser.Physics.Matter.Matter;
        const circle = Bodies.circle(this.x, this.y, 12, { isSensor: false, label: 'collider'});
        this.setExistingBody(circle);
        this.setStatic(true);
        this.setOrigin(0.5, yOrigin);
    }

    static preload(scene) {
        scene.load.atlas('foliage', 'assets/images/foliage.png', 'assets/images/foliage_atlas.json');
    }
}