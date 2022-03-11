
export const types = {
    number: 0,
    string: 1,
    bool: 2,
    options: 3,
};


export const get_param_info = (name, type) => {

    const info = {}
    const id_char = name.charAt(0)
    
    info.is_list = type.includes('[]');
    info.name = name.match(/\w+/)[0];
    info.is_optional = id_char === '?';
    info.is_input = id_char === '>';
    info.is_output = id_char === '<';

    if(type.charAt(0) === '*') {
        const type_str = type.match(/\w+/)[0];  //get word
        info.type = types[type_str];
    } else { //a list of available values
        info.type = types.options;
        info.choices = type.split('&');
    }

    return info;

}
