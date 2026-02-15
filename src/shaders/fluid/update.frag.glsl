precision highp float;
precision highp sampler2D;

varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;

uniform sampler2D uTexture;
uniform float uDamping;

void main() {
    vec4 info = texture2D(uTexture, vUv);

    // Sample 4 neighbor heights (R channel)
    float average = (
        texture2D(uTexture, vL).r +
        texture2D(uTexture, vR).r +
        texture2D(uTexture, vT).r +
        texture2D(uTexture, vB).r
    ) * 0.25;

    // Spring force: accelerate velocity toward neighbor average
    info.g += (average - info.r) * 2.0;

    // Damping: dissipate energy over time
    info.g *= uDamping;

    // Integrate: velocity -> height
    info.r += info.g;

    gl_FragColor = info;
}
