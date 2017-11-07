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

    var geometry   = new THREE.SphereGeometry(0.5, 32, 32)
    // var material  = new THREE.MeshPhongMaterial()
    var material    = new THREE.MeshPhongMaterial({
      map        : THREE.ImageUtils.loadTexture('images/earthmap1k.jpg'),
      bumpMap        : THREE.ImageUtils.loadTexture('images/earthbump1k.jpg'),
      bumpScale    : 0.05,
      specularMap    : THREE.ImageUtils.loadTexture('images/earthspec1k.jpg'),
      // specular    : new THREE.Color('grey'),
    })

    var earthMesh = new THREE.Mesh(geometry, material)
    scene.add(earthMesh)


    var light  = new THREE.AmbientLight( 0x222222 )
    scene.add( light )
    var light  = new THREE.DirectionalLight( 0xffffff, 1 )
    light.position.set(5,5,5)
    scene.add( light )
    light.castShadow  = true
    light.shadowCameraNear  = 0.01
    light.shadowCameraFar  = 15
    light.shadowCameraFov  = 45
    light.shadowCameraLeft  = -1
    light.shadowCameraRight  =  1
    light.shadowCameraTop  =  1
    light.shadowCameraBottom= -1
    // light.shadowCameraVisible  = true
    light.shadowBias  = 0.001
    light.shadowDarkness  = 0.2
    light.shadowMapWidth  = 1024
    light.shadowMapHeight  = 1024

    var light = new THREE.AmbientLight(0x888888);
    scene.add(light);

    var light    = new THREE.DirectionalLight( 0xcccccc, 1 )
    light.position.set(5,3,5)
    scene.add( light )


    camera.position.z = 2
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

  render(){
    this.renderer.render(this.scene, this.camera)
  }

}
