#!/bin/bash

# Detecta o sistema operacional
if grep -qi ubuntu /etc/os-release; then
    OS="ubuntu"
elif grep -qi microsoft /proc/version; then
    OS="wsl"
else
    echo "Sistema operacional não suportado."
    exit 1
fi

# Função para instalar Docker e Make no Ubuntu
install_ubuntu() {
    # Atualiza os pacotes e instala o Docker e Make
    sudo apt-get update
    sudo apt-get install -y docker.io make

    # Inicia o serviço Docker
    sudo systemctl start docker
    sudo systemctl enable docker

    echo "Docker e Make instalados com sucesso no Ubuntu."
}

# Função para instalar Docker e Make no WSL
install_wsl() {
    # Verifica se o WSL está instalado, senão, instala
    if ! command -v wsl > /dev/null; then
        echo "Instalando WSL..."
        wsl --install
    fi

    # Atualiza os pacotes e instala o Docker e Make
    sudo apt-get update
    sudo apt-get install -y docker.io make

    # Adiciona o usuário atual ao grupo docker (precisa reiniciar)
    sudo usermod -aG docker $USER

    echo "Docker e Make instalados com sucesso no WSL."
    echo "Por favor, reinicie o terminal para aplicar as alterações no grupo Docker."
}

# Instala de acordo com o sistema operacional detectado
if [ "$OS" = "ubuntu" ]; then
    install_ubuntu
elif [ "$OS" = "wsl" ]; then
    install_wsl
fi
