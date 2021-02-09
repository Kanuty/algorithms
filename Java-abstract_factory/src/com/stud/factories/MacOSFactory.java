package com.stud.factories;

import com.stud.buttons.Button;
import com.stud.buttons.MacOSButton;
import com.stud.checkbox.Checkbox;
import com.stud.checkbox.MacOSCheckbox;

public class MacOSFactory implements GUIFactory {
    @Override
    public Button createButton() {
        return new MacOSButton();
    }

    @Override
    public Checkbox createCheckbox() {
        return new MacOSCheckbox();
    }
}
