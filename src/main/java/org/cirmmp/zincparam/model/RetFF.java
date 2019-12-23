package org.cirmmp.zincparam.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor

public class RetFF {
    private List<String> filecont;
    private String filename;
    private int exitcode;
}
