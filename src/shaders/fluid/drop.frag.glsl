precision highp float;
precision highp sampler2D;

varying vec2 vUv;

uniform sampler2D uTexture;
uniform vec2 uCenter;
uniform float uRadius;
uniform float uStrength;

void main() {
    vec4 info = texture2D(uTexture, vUv);

    float drop = max(0.0, 1.0 - length(vUv - uCenter) / uRadius);
    drop = 0.5 - cos(drop * 3.14159265) * 0.5;

    info.r += drop * uStrength;

    gl_FragColor = info;
}
