precision highp float;
precision highp sampler2D;

varying vec2 vUv;

uniform sampler2D uRipples;
uniform sampler2D uBackground;
uniform vec2 uDelta;
uniform float uPerturbance;

void main() {
    // Sample height at current pixel and neighbors for normal reconstruction
    float height  = texture2D(uRipples, vUv).r;
    float heightX = texture2D(uRipples, vec2(vUv.x + uDelta.x, vUv.y)).r;
    float heightY = texture2D(uRipples, vec2(vUv.x, vUv.y + uDelta.y)).r;

    // Build tangent vectors from height differences
    vec3 dx = vec3(uDelta.x, heightX - height, 0.0);
    vec3 dy = vec3(0.0, heightY - height, uDelta.y);

    // Surface normal via cross product — xz gives UV offset direction
    vec2 offset = -normalize(cross(dy, dx)).xz;

    // --- Chromatic aberration: split R, G, B through slightly different refraction ---
    float aberration = 0.003;
    vec2 refractR = clamp(vUv + offset * (uPerturbance + aberration), 0.0, 1.0);
    vec2 refractG = clamp(vUv + offset * uPerturbance, 0.0, 1.0);
    vec2 refractB = clamp(vUv + offset * (uPerturbance - aberration), 0.0, 1.0);

    float r = texture2D(uBackground, refractR).r;
    float g = texture2D(uBackground, refractG).g;
    float b = texture2D(uBackground, refractB).b;
    vec3 color = vec3(r, g, b);

    // --- Dual specular highlights ---
    // Primary light: upper-right
    vec2 lightDir1 = normalize(vec2(-0.6, 1.0));
    float spec1 = pow(max(0.0, dot(offset, lightDir1)), 4.0);

    // Secondary light: lower-left (softer, warmer)
    vec2 lightDir2 = normalize(vec2(0.7, -0.5));
    float spec2 = pow(max(0.0, dot(offset, lightDir2)), 6.0);

    // --- Fresnel-like edge brightening on steep wave slopes ---
    float slope = length(offset);
    float fresnel = smoothstep(0.0, 0.5, slope);

    // Combine: green-white primary, warm gold secondary, subtle fresnel glow
    vec3 specColor1 = vec3(0.8, 1.0, 0.85) * spec1 * 0.9;
    vec3 specColor2 = vec3(1.0, 0.9, 0.7) * spec2 * 0.35;
    vec3 fresnelGlow = vec3(0.7, 0.95, 0.8) * fresnel * 0.12;

    gl_FragColor = vec4(color + specColor1 + specColor2 + fresnelGlow, 1.0);
}
