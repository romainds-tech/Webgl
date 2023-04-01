/*
 * WebGL Shader utils in TypeScript
 *
 * Copyright 2018, Yann Gilquin
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 */

export const WebGLShaderUtils = (() => {
    function createShader(gl: WebGLRenderingContext, source: string, type: GLenum): WebGLShader {
        // @ts-ignore
        const shader: WebGLShader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const log = gl.getShaderInfoLog(shader);
            throw new Error(`Shader compilation failed\n\n${log}\n\n${dumpShaderSrc(source)}`);
        }

        return shader;
    }

    function initShaders(gl: WebGLRenderingContext, vShaderSrc: string, fShaderSrc: string): WebGLProgram {
        const vShader: WebGLShader = createShader(gl, vShaderSrc, gl.VERTEX_SHADER);
        const fShader: WebGLShader = createShader(gl, fShaderSrc, gl.FRAGMENT_SHADER);

        const program = gl.createProgram();

        if (program === null) {
            throw new Error('WebGL 2 not supported');
        } else {
            gl.attachShader(program, vShader);
            gl.attachShader(program, fShader);

            gl.linkProgram(program);
            gl.validateProgram(program);

            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                const log = gl.getProgramInfoLog(program);
                throw new Error(`Program link failed\n\n${log}`);
            }

            return program;

        }

    }

    function dumpShaderSrc(source: string): string {
        const formatLine = (current: string, index: number) => {
            return `${(index + 1).toString().padStart(3)} ${current}`;
        };

        const lines: string[] = shaderStringToArray(source);
        return shaderArrayToString(lines.map(formatLine));
    }

    function shaderArrayToString(array: string[]): string {
        return array.join('\n');
    }

    function shaderStringToArray(string: string): string[] {
        return string.split('\n');
    }

    return {
        createProgram: initShaders,
        shaderArrayToString,
        shaderStringToArray,
    };
})();
