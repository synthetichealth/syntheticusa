const THREE = require('three');

export default class GlobeScene {

  constructor(canvas){
    const width = canvas.clientWidth
    const height = canvas.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true })

    var geometry   = new THREE.SphereGeometry(0.5, 64, 64)
    var material  = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('images/2_no_clouds_2k.jpg'),
        bumpMap: new THREE.TextureLoader().load('images/elev_bump_2k.jpg'),
        bumpScale: 0.02,
        specularMap: THREE.ImageUtils.loadTexture('images/earthspec1k.jpg'),
        specular: new THREE.Color(0x222222)
    })

    // material.map = new THREE.TextureLoader().load('images/earthmap1k.jpg')
    var earthMesh = new THREE.Mesh(geometry, material)
    earthMesh.rotation.x = .25
    earthMesh.rotation.y = .28
    scene.add(earthMesh)


    var light  = new THREE.AmbientLight( 0x111111 )
    scene.add( light )
    var light2  = new THREE.DirectionalLight( 0x99a0a0, 1 )
    light2.position.set(5,5,5)
    scene.add( light2 )
    light2.castShadow  = true

    var cloudGeometry   = new THREE.SphereGeometry(0.51, 64, 64)
    var cloudMaterial  = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/earthcloudmap.png'),
        opacity     : .7,
        transparent : true,
        depthWrite  : false,
    })
    this.cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial)
    earthMesh.add(this.cloudMesh)
    // light.shadowCameraNear  = 0.01
    // light.shadowCameraFar  = 15
    // light.shadowCameraFov  = 45
    // light.shadowCameraLeft  = -1
    // light.shadowCameraRight  =  1
    // light.shadowCameraTop  =  1
    // light.shadowCameraBottom= -1
    // light.shadowCameraVisible  = true
    // light.shadowBias  = 0.001
    // light.shadowDarkness  = 0.2
    // light.shadowMapWidth  = 1024
    // light.shadowMapHeight  = 1024

    // var light = new THREE.AmbientLight(0x888888);
    // scene.add(light);

    // var light    = new THREE.DirectionalLight( 0xcccccc, 1 )
    // light.position.set(5,3,5)
    // scene.add( light )


    camera.position.z = .65
    camera.position.y = .15
    camera.position.x = .10
    renderer.setClearColor('#000000')
    renderer.setSize(width, height)

    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.material = material
    this.earthMesh = earthMesh

    canvas.appendChild(this.renderer.domElement)
  }

  animate(){

  }

  render(time){
    
    if(!this.time) this.time = 0; 
    let delta = time - this.time;
    this.time = time;

    if(delta){
        this.cloudMesh.rotation.y += delta/100000;
    }

    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.render.bind(this))

  }

}
