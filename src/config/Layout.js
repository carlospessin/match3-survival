export const Layout = {

    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight

};

Layout.leftWidth =
    Layout.screenWidth / 2;

Layout.rightWidth =
    Layout.screenWidth / 2;

Layout.rightX =
    Layout.leftWidth;

// Inventory (direita superior esquerda)
Layout.inventory = {

    x: Layout.rightX + 20,
    y: 20

};

// Status (direita superior direita)
Layout.status = {

    x: Layout.rightX + Layout.rightWidth / 2 + 20,
    y: 20

};

// Campfire (centro inferior direito)
Layout.campfire = {

    x: Layout.rightX + Layout.rightWidth / 2,
    y: Layout.screenHeight - 180

};

// Action buttons (centro inferior)
Layout.actions = {

    x: Layout.screenWidth / 2,
    y: Layout.screenHeight - 50

};
