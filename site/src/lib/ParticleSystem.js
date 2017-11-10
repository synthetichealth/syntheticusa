
let THREE = require('three');

const vertexShader = `

  attribute float size;
  attribute vec3 customColor;
  attribute float startTime;

  uniform float currentTime;

  varying float timeDiff;

  varying vec3 vColor;

  void main() {

    timeDiff = (currentTime - startTime);

    vColor = customColor;

    // vec3 positionUpdate = vec3(position.x, position.y + (currentTime - startTime)/10000., position.z);
    vec3 positionUpdate = vec3(position);

    vec4 mvPosition = modelViewMatrix * vec4( positionUpdate, 1.01 );

    gl_PointSize = size * ( 100.0 / -mvPosition.z );
    // gl_PointSize = size * ( 300.0 / -mvPosition.z ) / ((currentTime - startTime) / 2000.);

    gl_Position = projectionMatrix * mvPosition;

}`;

const fragmentShader = `

  uniform vec3 color;
  uniform sampler2D texture;

  varying vec3 vColor;
  varying float timeDiff;

  void main() {


    gl_FragColor = vec4( color * vColor, cos(timeDiff/4500.) );

    gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );

    if(timeDiff > 8500. || timeDiff <= 0.){
      discard;
      //gl_FragColor = vec4(0);
    }

  }

`

export default class ParticleSystem {


  constructor() {
    this.lastTime = 0;
    this.currentIndex = 0;

    // let texture = new THREE.TextureLoader().load( "assets/graph.jpg" );
    this.uniforms = {

      color:     { value: new THREE.Color( 0xffffff ) },
      texture:   { value: new THREE.TextureLoader().load( "images/spark1.png" ) },
      currentTime:     { value: Date.now()},

    };

    var shaderMaterial = new THREE.ShaderMaterial( {

      uniforms:       this.uniforms,
      vertexShader:   vertexShader,
      fragmentShader: fragmentShader,

      blending:       THREE.AdditiveBlending,
      depthTest:      false,
      transparent:    true

    });

    let particles = 1000;

    var radius = 1;

    this.geometry = new THREE.BufferGeometry();

    var positions = new Float32Array( particles * 3 );
    var colors = new Float32Array( particles * 3 );
    var sizes = new Float32Array( particles );
    var startTimes = new Float32Array( particles );

    var color = new THREE.Color();

    for ( var i = 0, i3 = 0; i < particles; i ++, i3 += 3 ) {

      positions[ i3 + 0 ] = ( Math.random() * 2 - 1 ) * radius;
      positions[ i3 + 1 ] = ( Math.random() * 2 - 1 ) * radius;
      positions[ i3 + 2 ] = ( Math.random() * 2 - 1 ) * radius;

      color.setHSL( i / particles, 1.0, 0.5 );

      colors[ i3 + 0 ] = color.r;
      colors[ i3 + 1 ] = color.g;
      colors[ i3 + 2 ] = color.b;

      sizes[ i ] = .1;
      startTimes[ i ] = Date.now();

    }

    this.geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    this.geometry.addAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
    this.geometry.addAttribute( 'size', new THREE.BufferAttribute( sizes, 1 ) );
    this.geometry.addAttribute( 'startTime', new THREE.BufferAttribute( startTimes, 1 ) );

    this.particleSystem = new THREE.Points( this.geometry, shaderMaterial );
    this.particleSystem.rotation.y += Math.PI
  }

  incrementIndex(){
    this.currentIndex++;
    this.currentIndex = this.currentIndex % 1000;
  }

  animate(time){
    // this.particleSystem.rotation.y += .01
    // console.log(this.particleSystem.rotation.y)
    this.uniforms.currentTime.value = time
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.attributes.customColor.needsUpdate = true;
    this.geometry.attributes.startTime.needsUpdate = true;
    // this.plane.position.z -= .001;

  }

}
